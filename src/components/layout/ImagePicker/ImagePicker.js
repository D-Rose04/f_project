import React, { useState, useEffect, useRef } from 'react';

export default function ImagePicker ( { className, title, name, controlId, width, onImageSet, loadImage, defaultImage = null } ) {
    const imgInputRef = useRef( null )
    const [image, setImage] = useState( null );
    const [imageURL, setImageURL] = useState( null );

    useEffect( () => {
        if (loadImage) {
            loadImage(setLoadImage)
        }
        if ( defaultImage ) setImageURL( defaultImage );
        if ( image == null ) return;
        const newImageUrl = URL.createObjectURL( image );
        setImageURL( newImageUrl );
    }, [image] );

    function onImageChange ( e ) {

        setImage( e.target.files[0] );
        onImageSet( e.target.files[0] )
    }

    function deleteImage () {
        imgInputRef.current.value = null
        setImageURL(null)
    }

    const setLoadImage = (imgUrl) => {
        setImageURL(imgUrl)
    }

    return (
        <div className={'d-flex flex-column align-items-center ' + className}>
            <img className='img-fluid' width={width ?? 300} src={imageURL ?? require( '../../../img/dog-white.png' )} onClick={() => imgInputRef.current.click()} alt='Imagen de la mascota' style={{maxHeight:'260px', cursor:'pointer'}} />
            <input className='d-none' ref={imgInputRef} type='file' name={name} id={controlId} accept="image/*" onChange={onImageChange} />
            {imageURL ? <button type='button' className='btn btn-primary mt-2' onClick={deleteImage}>Borrar Imagen</button> : <h6 className='text-white'>{title}</h6>}
        </div>
    );
}