import React, {useEffect, useState} from 'react';
import LinkForm from './LinkForm';
import {db} from '../firebase';
import {toast} from 'react-toastify';


const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEdit = async (linkObject) => {
        // de la database firebase quiero crear una coleccion de datos que le genera un unico id doc y set, los datos me los pasa del linkObject
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject);
                toast('Nuevo link agregado!', {
                    type: 'success',
                });
            }
            else {
                await db.collection('links').doc(currentId).update(linkObject);
                toast('Link actualizado!', {
                    type: 'info',
                });
                setCurrentId('');
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const getLinks = async () => {
        // respuesta del database y obtener todos los datos, get
        await db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });
            // asigno al estado, los datos agrupados con sus id's
            setLinks(docs);
        });
        
    };

    const onDelete = async id => {
        if (window.confirm('Estas seguro que desea eliminarlo?')) {
            await db.collection('links').doc(id).delete();
            toast('Link eliminado!', {
                type: 'error',
                autoClose: 2000
            })
        }
    }

    useEffect(() =>{
        getLinks();
    }, []);

    return (
        <div>
            <div className="col-md-12 p-2">
                <LinkForm {...{addOrEdit, currentId, links}}/>
            </div>

            <div className="col-md-12 p-2">
                {links.map(link => (
                    <div className="card mb-1 bg-dark text-light" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                <i className="material-icons text-danger" onClick={() => onDelete(link.id)}>close</i>
                                <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">Ir a la página</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Links;