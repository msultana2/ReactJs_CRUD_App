import React, {Component} from 'react';
import './App.css';

const DisplayList = (props) => (
    <ul>
        {props.itemList.map((item, index) =>
        <li key={index} className='myList'>
            {index+1}. {item.name}, {item.address}
            <button onClick={() => props.handleDelete(index)}>Delete</button>
            <button onClick={() => props.handleEdit(index)}>Edit</button>
        </li>
        )}
    </ul>
);
class CrudApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'React Simple CRUD Application',
            itemList: [],
            action: 0,
            indx: 0
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let name = this.refs.name.value;
        let address = this.refs.address.value;
        let arr1 = this.state.itemList;

        if(this.state.action === 0) {
            let item = {
                name, address
            }
            arr1.push(item);
        }
        else {
            let index = this.state.indx;
            arr1[index].name = name;
            arr1[index].address = address;
        }
        this.setState({
            itemList: arr1,
            action: 0
        });

        this.refs.myForm.reset();
        this.refs.name.focus();
    }
    handleDelete = (i) => {
        let arr2 = this.state.itemList;
        arr2.splice(i, 1);
        this.setState ({
            itemList: arr2
        }); 
        
        this.refs.myForm.reset();
        this.refs.name.focus();
    }
    handleEdit = (i) => {
        let item = this.state.itemList[i];
        this.refs.name.value = item.name;
        this.refs.address.value = item.address;
        this.setState({
            action: 1,
            indx: i
        });

        this.refs.name.focus();
    }
    render () {
        return (
            <div className='App'>
                <h1>{this.state.title}</h1>
                <form ref='myForm' onSubmit={this.handleSubmit} className='myForm'>
                    <input ref='name' className='inputField' type='text' placeholder='Enter Name' />
                    <input ref='address' className='inputField' type='text' placeholder='Enter Address' />
                    <button className='submitBtn'>Submit</button>
                </form>
                <DisplayList 
                    itemList={this.state.itemList}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                />
            </div>
        );
    }
}

export default CrudApp