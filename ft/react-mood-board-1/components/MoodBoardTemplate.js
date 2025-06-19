const MoodBoardTemplate = ({ onSelect, templates }) => {
  return (
    <div className="mood-board-template">
      <h3>Choose a Template</h3>
      <div className="template-grid">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="template-card"
            onClick={() => onSelect(template)}
          >
            <img 
              src={template.preview}
              alt={template.name}
              className="template-preview"
            />
            <h4>{template.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodBoardTemplate;
