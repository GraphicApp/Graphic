import React, {PropTypes} from 'react';

const InfoDisplay = ({info, processInput, serviceInput, onSubmitProcess, onSubmitService}) => {
  return (
    <div>
      <div>{info.system}</div>
      <form>
        <input
          name="process"
          label="Process"
          value={processInput}
          onSubmit={onSubmitProcess}
        />
      </form>
      <form>
        <input
          name="service"
          label="Service"
          value={serviceInput}
          onSubmit={onSubmitService}
        />
      </form>
    </div>
  );
};

// onChange={onChange}

InfoDisplay.propTypes = {
  info: React.PropTypes.object.isRequired,
  onSubmitProcess: React.PropTypes.func.isRequired,
  onSubmitService: React.PropTypes.func.isRequired
};

export default InfoDisplay;
