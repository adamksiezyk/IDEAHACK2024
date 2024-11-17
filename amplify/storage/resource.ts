import {defineStorage } from '@aws-amplify/backend';


export const storage = defineStorage({
    name: 'graph_json_storage',
    access: (allow) => ({
        'graphs/*': [
          allow.guest.to(['read']) // additional actions such as "write" and "delete" can be specified depending on your use case
        ]
      })
      });