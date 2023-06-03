import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Switch({text, details}) {
  return (    
    <><div className='d-flex my-5'>
        <Form.Check
            type="switch"
            id="custom-switch"
            label={text}
        />
        <Button className='ms-3'>...</Button>
        
    </div>
    <div>{details}
    </div>

    </>
  );
}

export default Switch;