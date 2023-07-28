export default {

    chatInput: {
      border: 'none',
      borderBottom: '1px solid white',
      boxShadow: 'none',
      backgroundColor: 'var(--color-sblue)',
      borderRadius: '0%',
      margin: '0 10px',
      padding: '5px 15px',
      height: 'fit-content',
      minHeight: 'fit-content',
      alignSelf: 'top',
      color: 'var(--color-white)',
      maxHeight: '121px',
      fontSize: '14px',
      resize: 'none',
      '&:focus': {
        boxShadow: 'none',
        border: 'none',
        backgroundColor: 'var(--color-sblue)',
        borderRadius: '0%',
        borderBottom: '1px solid var(--color-white)',
        color: 'var(--color-white)',
      },
      '&::placeholder': {
        color: 'white'
      },
    },
  };

