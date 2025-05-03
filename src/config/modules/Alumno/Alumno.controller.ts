import { Body, Controller, Req, UseInterceptors } from '@nestjs/common';
import { AlumnoService } from './Alumno.service';
import { SetTokenHeader } from 'src/config/interceptor/SetTokenHeader.interceptor';

@Controller('/alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}
  async findById(@Req() request) {
    const { nivel, year } = request;
    const alumnoId = request.body.alumnoId;
    const alumno = await this.alumnoService.getById({ nivel, year, _id: alumnoId });

    return alumno;
  }
  async findByNombreCompleto(@Req() request, @Body() body) {
    const { nivel, year } = request;
    const { nombreCompleto } = request.body;
    const alumnos = this.alumnoService.findByNombreCompleto({ nivel, year, nombreCompleto });
    const data = [];
    for await (let doc of alumnos) {
      data.push(doc);
    }
    return data;
  }
}
