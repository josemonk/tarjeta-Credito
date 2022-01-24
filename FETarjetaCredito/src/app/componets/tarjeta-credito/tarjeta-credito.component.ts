import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
listaTarjeta:any[]=[];
accion ='Agregar';
id:number|undefined; 
form: FormGroup;


  constructor(private fb:FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService:TarjetaService) {
    this.form=this.fb.group({
      titular:['',Validators.required],
      numeroTarjeta:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      fechaExpiracion:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    })
   }


   obtenerTarjetas(){
     this._tarjetaService.getListTarjeta().subscribe(data =>{
       console.log(data);
       this.listaTarjeta=data;
     },error=>{
       console.log(error);
     })
   }


   guardarTarjeta(){
    
     const tarjeta: any={
     titular:this.form.get('titular')?.value,
     numeroTarjeta:this.form.get('numeroTarjeta')?.value,
     fechaExpiracion:this.form.get('fechaExpiracion')?.value,
     cvv:this.form.get('cvv')?.value,
    }
    if(this.id ==undefined){
      //agregamos una nueva tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('la tarjeta fue registrada con exito', 'tarjeta registrada');
        this.obtenerTarjetas();
        this.form.reset();
  
      },error=>{
        this.toastr.error('opss ocurrio un error','error')
        console.log(error);
      })
    }else{
      //editamos una nueva tarjeta
      tarjeta.id =this.id ;
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(data=>{
        this.form.reset();
        this.accion='Agregar';
        this.id = undefined;
        this.toastr.info('la tarjeta fue actualizada!','Tarjeta Actualizada');
        this.obtenerTarjetas();
      },error=>{
        console.log(error);
      })
    }


   
    
   }
   eliminarTarjeta(id:number){
     this._tarjetaService.deleteTarjeta(id).subscribe(data=>{
     this.toastr.error('la tarjeta fue eliminada','tarjeta eliminada');
     this.obtenerTarjetas();

     },error=>{
       console.log(error);
     })
   }
   editarTarjeta(tarjeta:any){
     this.accion='editar';
     this.id=tarjeta.id;

     this.form.patchValue({
       titular:tarjeta.titular,
       numeroTarjeta:tarjeta.numeroTarjeta,
       fechaExpiracion:tarjeta.fechaExpiracion,
       cvv:tarjeta.cvv
     })
   }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

}
