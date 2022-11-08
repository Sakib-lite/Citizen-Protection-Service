const Error = (msg,payload) => {
    return {
      userErrors: [
        {
          message: msg,
        },
      ],
      payload:null,
    };
  };


  module.exports =Error;