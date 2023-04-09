import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../utility/database'

export class UserModel extends Model {}

UserModel.init(
  {
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    enroll: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'users',
    timestamps: true,
    freezeTableName: true,
  }
)

UserModel.sync()
