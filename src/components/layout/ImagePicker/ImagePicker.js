import React, { useState, useEffect, useRef } from 'react';

export default function ImagePicker({ className, name, controlId }) {
    const imgInputRef = useRef(null)
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        if (image == null) return;
        const newImageUrl = URL.createObjectURL(image);
        setImageURL(newImageUrl);
    }, [image]);

    function onImageChange(e) {
        console.log(e.target.files)
        setImage(e.target.files[0]);
    }

    function deleteImage() {
        imgInputRef.current.value = null
        setImageURL(null)
    }

    return (
        <div className={'d-flex flex-column align-items-center ' + className}>
            <img className='img-fluid' width={300} src={imageURL ?? require('../../../img/dog-white.png')} onClick={() => imgInputRef.current.click()} />
            <input className='d-none' ref={imgInputRef} type='file' name={name} id={controlId} accept="image/*" onChange={onImageChange} />
            {imageURL ? <button className='btn btn-primary mt-2' onClick={deleteImage}>Borrar Imagen</button> : <h6 className='text-white'>Seleccionar Imagen</h6>}
        </div>
    );
}