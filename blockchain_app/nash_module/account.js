const account = {
        type: 'object',
        required: ["nashStablecoin"],
        properties: {
          nash: {
              fieldNumber: 1,
              type: 'object',
              required: ['balance'],
              properties: {
                balance: {
                  fieldNumber: 1,
                  dataType: 'uint32',},
                },
              default: {
                balance: 0,
                }, 
            },
          bonds: {
                fieldNumber: 2,
                type: 'object',
                required: ['list'],
                properties: {
                  list: {
                    type: 'array',
                    fieldNumber: 1,
                    items: {
                        dataType: 'uint32',
                    },
                  },
                },
                default: {
                  list: [],
                }, 
          },
          share: {
                fieldNumber: 3,
                type: 'object',
                required: ['balance',"lastNonce"],
                properties: {
                  balance: {
                    dataType: 'uint32',
                    fieldNumber: 1,
                  },
                  lastNonce: {
                    dataType: 'uint32',
                    fieldNumber: 2,
                  },
                },
                default: {
                  balance: 0,
                  lastNonce: 0,
                }, 
          },
      },
};

module.exports = {account};