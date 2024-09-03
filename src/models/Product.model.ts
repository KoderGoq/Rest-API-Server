import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'products', // Nombre de la tabla
})


class Product extends Model {   // Creamos el modelo de la base de datos
  @Column({
    type: DataType.STRING(100) // DataType es para tipar el modelos y decirle el tipo de dato que usaremos
  })
  declare name: string

  @Column({
    type: DataType.FLOAT
  })
  declare price: number

  @Default(true) // Cada que agruegemos un nuevo producto siempre sera TRUE
  @Column({
    type: DataType.BOOLEAN()
  })
  declare availability: boolean
}

export default Product