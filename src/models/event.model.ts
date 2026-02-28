import { DataTypes, Sequelize } from 'sequelize';

const defineEvent = (sequelize: Sequelize) => {
  return sequelize.define(
    'Event',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      event_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      participant_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_virtual: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: 'events',
      underscored: true,
      createdAt: 'created_at',
      updatedAt: false
    }
  );
};

export default defineEvent;
