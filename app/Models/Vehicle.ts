import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string
  
  @column()
  public description: string
  
  @column()
  public plate: string
  
  @column()
  public year: number

  @column()
  public color: string
  
  @column()
  public price: number  
  
  @column({columnName: "is_favorite"})
  public isFavorite: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}