import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const Link = require("react-router-dom").Link;


const Top = () => (
  <div>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <div className='form'>
      <Form>
        <Form.Group>
          <Form.Label>ルーム名を入力してください。</Form.Label>
          <Form.Control size="lg" type="text" placeholder="Input Room Name" />
        </Form.Group>
        <Link to="/enter4" style={{ textDecoration: 'none', color: 'black' }}>
          <Button>Enter</Button>
        </Link>
      </Form>
    </div>
  </div>
)

export default Top