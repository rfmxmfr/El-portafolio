import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card, CardHeader } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Plus, MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
import DesignCard from './DesignCard';
import DesignCardForm from './DesignCardForm';

export default function DesignList({ list, index, onAddCard, onDeleteCard, onUpdateTitle, onDeleteList }) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    onUpdateTitle(list.id, title);
    setIsEditing(false);
  };

  const handleAddCard = (cardData) => {
    onAddCard(list.id, cardData);
    setShowForm(false);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-72 flex-shrink-0"
        >
          <Card className="bg-neutral-50 border-neutral-200">
            <CardHeader 
              className="p-3 flex flex-row items-center justify-between"
              {...provided.dragHandleProps}
            >
              {isEditing ? (
                <form onSubmit={handleTitleSubmit} className="flex-1">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-1 border border-neutral-300 rounded text-sm"
                    autoFocus
                    onBlur={handleTitleSubmit}
                  />
                </form>
              ) : (
                <h3 className="font-medium text-neutral-900">{list.title}</h3>
              )}
              
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowMenu(!showMenu)}
                  className="h-8 w-8 p-0"
                >
                  <MoreHorizontal size={16} className="text-neutral-600" />
                </Button>
                
                {showMenu && (
                  <div className="absolute right-0 mt-1 w-40 bg-white border border-neutral-200 rounded-md shadow-md z-10">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-neutral-100"
                    >
                      <Edit2 size={14} className="mr-2 text-neutral-600" />
                      {t('Edit Title')}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(t('Are you sure you want to delete this list?'))) {
                          onDeleteList(list.id);
                        }
                        setShowMenu(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-neutral-100 text-red-600"
                    >
                      <Trash2 size={14} className="mr-2" />
                      {t('Delete List')}
                    </button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <Droppable droppableId={list.id} type="card">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 min-h-[50px] ${
                    snapshot.isDraggingOver ? 'bg-neutral-100' : ''
                  }`}
                >
                  {list.cards.map((card, cardIndex) => (
                    <DesignCard
                      key={card.id}
                      card={card}
                      index={cardIndex}
                      listId={list.id}
                      onDelete={onDeleteCard}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            <div className="p-2 border-t border-neutral-200">
              {showForm ? (
                <DesignCardForm
                  onSubmit={handleAddCard}
                  onCancel={() => setShowForm(false)}
                />
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setShowForm(true)}
                  className="w-full justify-start text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                >
                  <Plus size={16} className="mr-2" />
                  {t('Add Card')}
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}