const dynamoose = require("dynamoose");
import { SchemaDefinition } from 'dynamoose/dist/Schema'
import { OperationTypes } from '../../1-domain/entities/tokenEntity';

const schema: SchemaDefinition = {
  pk: {
    type: String,
    hashKey: true,
    required: true,
    index: {
      name: 'tokensCreatedAt',
      type: 'global',
      rangeKey: 'createdAt'
    }
  },
  sk: {
    type: String,
    rangeKey: true,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  operationType: {
    type: String,
    enum: Object.values(OperationTypes),
    required: true
  },
  email: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  }
}

export const TokenModel = dynamoose.model('Tokens', new dynamoose.Schema(schema, { timestamps: true }));
