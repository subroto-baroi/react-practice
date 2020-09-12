import React from 'react';
import { useForm } from 'react-hook-form';
import "./Shipment.css"
import { useContext } from 'react';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext (UserContext)
    const onSubmit = data => console.log(data);
  console.log(watch("example")); 

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>         
      
      <input name="name" defaultValue={loggedInUser.name} placeholder="Write your name" ref={register({ required: true })} />      
      {errors.name && <span className='error'>Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} placeholder="Write your email" ref={register({ required: true })} />      
      {errors.email && <span className='error'>Email is required</span>}

      <input name="address" placeholder="Write your address" ref={register({ required: true })} />      
      {errors.address && <span className='error'>Address is required</span>}

      <input name="phone" placeholder="Write your phone" ref={register({ required: true })} />      
      {errors.phone && <span className='error'>Phone is required</span>}
      
      <input className="btn btn-primary" type="submit" />
    </form>
  );
};

export default Shipment;