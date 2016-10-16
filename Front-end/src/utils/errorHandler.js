export default function errorHander (error, dispatch, action) {
  console.log(error)
  console.log(error.response)
  // error case when Api server is down
  if (error instanceof Error && error.message.includes('Network')) {
    dispatch(action({
      message: `Sorry there's a ${error.message}. Please retry again later.`,
      status: true
    }))
  } else { // if request is bad...
    dispatch(action({
      message: error.response.data.message || error.response.statusText,
      status: true
    }))
  }
}
