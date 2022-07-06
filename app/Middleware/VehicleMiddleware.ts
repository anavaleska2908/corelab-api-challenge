import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehicleMiddleware {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    const params = request.params();
    !!params?.id && await this.validateId({response}, next, params.id);
    !!request?.body && await this.validateFields({request, response}, next);
  } 
  private async validateId({response}, next: () => Promise<void>, id: number) {
    const vehicleExists = await Vehicle.find(id);
    vehicleExists ? await next() : response.notFound({status: "error", message: "Vehicle not found."});
  }  
  private async validateFields({request, response}, next: () => Promise<void>) {
    const method = request.method();    
    const body = request.body();        
    const fields = ["name","description","plate","year","color","price", "isFavorite"];
    if (method === 'POST') {
      for (let i = 0; i < fields.length; i++) {
        if (!!!body[fields[i]] && !!body?.isFavorite) {        
          return response.status(400).send({status: "error", message: `${fields[i]} is required.`});
        }        
      }
    } else if (method === 'PATCH') {
      for (const field in body) {      
        if (!fields.includes(field.toString())) {
          return response.status(400).send({status: "error", message: `${field} is invalid field.`});          
        }
      } 
    } 
    await next(); 
  }
}
