import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from '../Models/Vehicle'

export default class VehiclesController {
    public async index({response}: HttpContextContract) {
      const vehicles = await Vehicle.all();
      response.status(200).send(vehicles);      
    }
    public async store({request, response}: HttpContextContract) {       
      const vehicle = await Vehicle.create(request.body());
      response.status(201).send(vehicle);
    }
    public async update({request, response}: HttpContextContract) {
      const id = request.param("id");
      const body = request.body();
      const vehicle = await Vehicle.find(id);
      await vehicle?.merge(body).save();
      response.status(200).send(vehicle);
    }
    public async show({request, response}: HttpContextContract) {
      const id = request.param("id");
      const vehicle = await Vehicle.find(id);
      response.status(200).send(vehicle);
    }
    public async destroy({request, response}: HttpContextContract) {
      const id = request.param("id");
      const vehicle = await Vehicle.find(id);
      vehicle?.delete();
      response.status(204);
    }
}
