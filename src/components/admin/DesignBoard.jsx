import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Plus, Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import { editableContentStorage } from '../../lib/utils';
import { changeTracker } from '../../lib/utils';
import DesignList from './DesignList';
import DesignCardForm from './DesignCardForm';

export default function DesignBoard() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [lists, setLists] = useState(() => {
    return editableContentStorage.load('designBoard', {
      lists: [
        {
          id: 'list-1',
          title: 'Ideas',
          cards: []
        },
        {
          id: 'list-2',
          title: 'In Progress',
          cards: []
        },
        {
          id: 'list-3',
          title: 'Completed',
          cards: []
        }
      ]
    }).lists;
  });
  
  const [months, setMonths] = useState(() => {
    return editableContentStorage.load('designGallery', {
      months: [
        {
          id: 'month-1',
          name: 'January',
          expanded: false,
          items: []
        },
        {
          id: 'month-2',
          name: 'February',
          expanded: false,
          items: []
        }
      ]
    }).months;
  });

  useEffect(() => {
    editableContentStorage.save('designBoard', { lists });
  }, [lists]);

  useEffect(() => {
    editableContentStorage.save('designGallery', { months });
  }, [months]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle list reordering
    if (type === 'list') {
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
      
      setLists(newLists);
      changeTracker.trackChange('REORDER_DESIGN_LIST', {
        listId: draggableId,
        fromIndex: source.index,
        toIndex: destination.index
      });
      return;
    }

    // Handle card reordering
    const sourceList = lists.find(list => list.id === source.droppableId);
    const destList = lists.find(list => list.id === destination.droppableId);
    
    // Moving within the same list
    if (sourceList === destList) {
      const newCards = Array.from(sourceList.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);
      
      const newList = {
        ...sourceList,
        cards: newCards
      };
      
      setLists(lists.map(list => 
        list.id === newList.id ? newList : list
      ));
      
      changeTracker.trackChange('REORDER_DESIGN_CARD', {
        cardId: draggableId,
        listId: sourceList.id,
        fromIndex: source.index,
        toIndex: destination.index
      });
      return;
    }
    
    // Moving to a different list
    const sourceCards = Array.from(sourceList.cards);
    const [removed] = sourceCards.splice(source.index, 1);
    const destCards = Array.from(destList.cards);
    destCards.splice(destination.index, 0, removed);
    
    setLists(lists.map(list => {
      if (list.id === sourceList.id) {
        return { ...list, cards: sourceCards };
      }
      if (list.id === destList.id) {
        return { ...list, cards: destCards };
      }
      return list;
    }));
    
    changeTracker.trackChange('MOVE_DESIGN_CARD', {
      cardId: draggableId,
      fromListId: sourceList.id,
      toListId: destList.id,
      fromIndex: source.index,
      toIndex: destination.index
    });
  };

  const handleAddCard = (listId, cardData) => {
    const targetList = lists.find(list => list.id === listId);
    if (!targetList) return;
    
    const newCard = {
      id: `card-${Date.now()}`,
      ...cardData
    };
    
    const updatedList = {
      ...targetList,
      cards: [...targetList.cards, newCard]
    };
    
    setLists(lists.map(list => 
      list.id === listId ? updatedList : list
    ));
    
    changeTracker.trackChange('ADD_DESIGN_CARD', {
      cardId: newCard.id,
      listId: listId,
      title: cardData.title
    });
    
    setShowForm(false);
  };

  const handleDeleteCard = (listId, cardId) => {
    const targetList = lists.find(list => list.id === listId);
    if (!targetList) return;
    
    const updatedCards = targetList.cards.filter(card => card.id !== cardId);
    const updatedList = {
      ...targetList,
      cards: updatedCards
    };
    
    setLists(lists.map(list => 
      list.id === listId ? updatedList : list
    ));
    
    changeTracker.trackChange('DELETE_DESIGN_CARD', {
      cardId,
      listId
    });
  };

  const handleAddList = () => {
    const newList = {
      id: `list-${Date.now()}`,
      title: 'New List',
      cards: []
    };
    
    setLists([...lists, newList]);
    changeTracker.trackChange('ADD_DESIGN_LIST', {
      listId: newList.id,
      title: newList.title
    });
  };

  const handleUpdateListTitle = (listId, newTitle) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, title: newTitle } : list
    ));
    
    changeTracker.trackChange('UPDATE_DESIGN_LIST_TITLE', {
      listId,
      title: newTitle
    });
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
    changeTracker.trackChange('DELETE_DESIGN_LIST', { listId });
  };

  const toggleMonthExpansion = (monthId) => {
    setMonths(months.map(month => 
      month.id === monthId ? { ...month, expanded: !month.expanded } : month
    ));
  };

  const handleAddGalleryItem = (monthId, file) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const newItem = {
        id: `item-${Date.now()}`,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: event.target.result,
        name: file.name,
        size: file.size,
        date: new Date().toISOString()
      };
      
      setMonths(months.map(month => {
        if (month.id === monthId) {
          return {
            ...month,
            items: [...month.items, newItem]
          };
        }
        return month;
      }));
      
      changeTracker.trackChange('ADD_GALLERY_ITEM', {
        monthId,
        itemId: newItem.id,
        name: newItem.name
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleDeleteGalleryItem = (monthId, itemId) => {
    setMonths(months.map(month => {
      if (month.id === monthId) {
        return {
          ...month,
          items: month.items.filter(item => item.id !== itemId)
        };
      }
      return month;
    }));
    
    changeTracker.trackChange('DELETE_GALLERY_ITEM', {
      monthId,
      itemId
    });
  };

  const handleAddMonth = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const newMonth = {
      id: `month-${Date.now()}`,
      name: monthNames[months.length % 12],
      expanded: true,
      items: []
    };
    
    setMonths([...months, newMonth]);
    changeTracker.trackChange('ADD_GALLERY_MONTH', {
      monthId: newMonth.id,
      name: newMonth.name
    });
  };

  return (
    <div className="space-y-8">
      <Card className="bg-white border-neutral-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-medium text-neutral-900">
            {t('Design Board')}
          </CardTitle>
          <Button
            onClick={handleAddList}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            <Plus size={16} className="mr-2" />
            {t('Add List')}
          </Button>
        </CardHeader>
        <div className="p-4 overflow-x-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {(provided) => (
                <div 
                  className="flex space-x-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {lists.map((list, index) => (
                    <DesignList
                      key={list.id}
                      list={list}
                      index={index}
                      onAddCard={handleAddCard}
                      onDeleteCard={handleDeleteCard}
                      onUpdateTitle={handleUpdateListTitle}
                      onDeleteList={handleDeleteList}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Card>

      <Card className="bg-white border-neutral-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-medium text-neutral-900">
            {t('Design Gallery')}
          </CardTitle>
          <Button
            onClick={handleAddMonth}
            className="bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            <Calendar size={16} className="mr-2" />
            {t('Add Month')}
          </Button>
        </CardHeader>
        <div className="p-4">
          <div className="space-y-4">
            {months.map((month) => (
              <div key={month.id} className="border border-neutral-200 rounded-md">
                <div 
                  className="flex items-center justify-between p-3 bg-neutral-50 cursor-pointer"
                  onClick={() => toggleMonthExpansion(month.id)}
                >
                  <div className="flex items-center">
                    {month.expanded ? 
                      <ChevronDown size={18} className="mr-2 text-neutral-600" /> : 
                      <ChevronRight size={18} className="mr-2 text-neutral-600" />
                    }
                    <h3 className="font-medium text-neutral-900">{month.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-500">
                      {month.items.length} {t('items')}
                    </span>
                    <label className="cursor-pointer bg-neutral-200 hover:bg-neutral-300 text-neutral-700 px-3 py-1 rounded-md text-sm">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleAddGalleryItem(month.id, e.target.files[0]);
                          }
                        }}
                      />
                      <Plus size={14} className="inline mr-1" />
                      {t('Add')}
                    </label>
                  </div>
                </div>
                
                {month.expanded && (
                  <div className="p-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {month.items.map((item) => (
                      <div key={item.id} className="relative group">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-md border border-neutral-200"
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center bg-neutral-100 rounded-md border border-neutral-200">
                            <span className="text-sm text-neutral-600 text-center p-2 truncate">
                              {item.name}
                            </span>
                          </div>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteGalleryItem(month.id, item.id)}
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/80 opacity-0 group-hover:opacity-100 hover:bg-red-100"
                        >
                          <span className="sr-only">Delete</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}