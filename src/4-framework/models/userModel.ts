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
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_bio: {
      type: DataTypes.STRING,
    },
    contact_info: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('default', 'admin'),
      allowNull: false,
      defaultValue: 'default'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
