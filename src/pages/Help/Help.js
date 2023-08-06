import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

export default function Help () {
  const [setTitle] = useOutletContext();

  useEffect( () => {
    setTitle( "Ayuda" );
  }, [] )

  return (
    <div className='container d-flex flex-column'>
      <div className='text-center'>
        <h3 className='mt-2' style={{ color: 'var(--color-sblue-d)', fontWeight:'bold'}}>Happy Tips y FAQS</h3>
      </div>
      <div className='d-flex justify-content-center mt-2'>
        <img className="d-block rounded" style={{ width: '550px', height: '280px' }} src="https://media.istockphoto.com/id/1372376277/photo/happy-smiling-puppy-dog-expression-isolated-on-green-background.webp?b=1&s=612x612&w=0&k=20&c=8lz39PlqBPFrPoXjJ2V3HHL9aKxyAdw47OaIik4dR9M=" alt="First slide" />
      </div>

      <div className=" d-flex justify-content-center">
        <div className="row d-flex flex-direction-column justify-content-around w-100 mt-3">
          <div style={{ width: '45%', height: '550px' }}>
            <div className='rounded' style={{ width: '100%', height: '350px', padding: '35px 15px 5px 15px', backgroundColor: 'var(--color-wisteria)' }}>
              <h3 className='text-center' style={{ color: 'var(--color-sblue-d)' }}>¿Puedo quedarme con una mascota temporalmente? </h3>
              <p style={{ textAlign: 'justify' }}>
                Muchos animalitos aún no tienen hogar y pueden estar esperando de tu colaboración.<br /><br />
                Realiza tu aporte alojando una de nuestras mascotas de manera temporal, durante el tiempo
                que puedas y si te encariñas con alguna de nuestras mascotas, puedes formalizar la adopcion
                y brindarle un hogar permanente.
              </p>
            </div>

            <div className="mt-3 rounded" style={{ width: '100%', height: '250px', padding: '35px 15px 5px 15px', backgroundColor: 'var(--color-sblue-d)' }}>
              <h3 className='text-center' style={{ color: 'var(--color-thistle)' }}>¿Aceptan donaciones? </h3>
              <p style={{ textAlign: 'justify' }}>
                De momento, estamos trabajando para poder aceptar donaciones y asi puedas apoyar a las mascotas,
                tus aportes serviran para seguir brindandoles cuidados de primera calidad, alimentos y una estadia
                digna para cada mascota.
              </p>
            </div>
          </div>

          <div className='rounded' style={{ width: '45%', height: '615px', backgroundColor: 'var(--color-indigo)', padding: '35px 15px 5px 15px' }}>
            <h3 className='text-center' style={{ color: 'var(--color-gray)' }}>¿Cuál es el proximo paso luego de adoptar? </h3>
            <p style={{ textAlign: 'justify' }}>
              Luego de brindarle un nuevo hogar a una de las mascotas, te recomendamos que
              procedas a realizar los siguientes pasos de manera constante:<br /> <br />
              <ul>
                <li>Visita un veterinario: Tu mascota necesita de cuidados y una buena salud, por lo que es
                  recomendable hagas visitas al menos 2 veces por año para asegurar que tu mascota se encuentra
                  en un estado óptimo.
                </li>
                <br />
                <li>Atiende sus exigencias nutricionales: No basta con solo alimentar a tu mascota con cualquier
                  comida, te invitamos a informarte sobre las necesidades que tiene tu mascota para un correcto
                  desarrollo y estilo de vida.
                </li>
                <br />
                <li>Vacuna tu mascota: Es necesario llevar un calendario de vacunaciones, asi puedes prevenir
                  afecciones de salud a tu mascota, lo que a su vez te ahorrara bastantes visitas al veterinario
                  por negligencia o descuido.
                </li>
              </ul>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}
