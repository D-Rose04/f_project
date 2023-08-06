export default {
  petImg: {
    flex: "1 1 0",
    width: "0"
  },

  customInput: {
    border: 'none',
    borderBottom: '1px solid white',
    backgroundColor: 'var(--color-white)',
    borderRadius: '0%',
    fontSize: '15px',
    '&:focus':{
      boxShadow: 'none',
      border: 'none',
      backgroundColor: 'var(--color-white)',
      borderRadius: '0%',
    }
  }
}