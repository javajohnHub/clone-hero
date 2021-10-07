import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject} from 'rxjs';



@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {
  songData: any[] = [];
  gamepadIndex: number = 0;
  color = '';
  myGamepad$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  myGamepad = this.myGamepad$.asObservable();
  pressed = [false, false, false, false, false];
  colors = ['green', 'red', 'yellow', 'blue', 'orange']
  up = false;
  down = false;
  strum = false;
  show = false;
  pressedNow = [];
  mapForm: FormGroup;
  customMap: any = {};
  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    const customMap = JSON.parse(localStorage.getItem('map'));
    this.myGamepad$.next(navigator.getGamepads()[this.gamepadIndex]);
    window.addEventListener("gamepadconnected", (e: GamepadEvent) => {
      this.gamepadIndex = e.gamepad.index;
    });
    
    if(customMap){
      this.useMap(customMap);
    }else {
      setInterval(() => {
        if (this.gamepadIndex !== undefined) {
          // a gamepad is connected and has an index
          this.myGamepad$.next(navigator.getGamepads()[this.gamepadIndex]);
          if(this.myGpad !== null){
            this.myGpad.buttons
            .map((e: any) => e.pressed)
            .forEach((isPressed: any, buttonIndex: any) => {
              if (isPressed) {
                if(buttonIndex === 8){
                  this.up = true;
                  this.down = false;
                }
                if(buttonIndex === 5) {
                  this.down = true;
                  this.up = false;
                }
                if(buttonIndex !== 5 && buttonIndex !== 8) {
                  this.down = false;
                  this.up = false;
                }
                // button is pressed; indicate this on the page
                this.pressed[buttonIndex] = true;
                this.pressedNow = buttonIndex
              }else {
                this.pressed[buttonIndex] = false;
              }
            });
        }
          }
          
      }, 5);
    }
  }

  createButtonsForm() {
    const buttons = this._fb.array([]) as FormArray;
    this.myGpad.buttons.forEach(button => {
      buttons.push(new FormControl({id: this.myGpad.id, button: button, color: 'white' }))
    })
    this.mapForm = this._fb.group({buttons: buttons})
    setInterval(() => {
    this.myGpad.buttons
          .map((e: any) => e.pressed)
          .forEach((isPressed: any, buttonIndex: any) => {
            if (isPressed) {
              if(buttonIndex === 8){
                this.up = true;
                this.down = false;
              }
              if(buttonIndex === 5) {
                this.down = true;
                this.up = false;
              }
              if(buttonIndex !== 5 && buttonIndex !== 8) {
                this.down = false;
                this.up = false;
              }
              // button is pressed; indicate this on the page
              this.pressed[buttonIndex] = true;
              this.pressedNow = buttonIndex
            }else {
              this.pressed[buttonIndex] = false;
            }
          });
      
        }, 5)
        
  }
  showMapping(){
    this.show = !this.show;
  }
  trackByFn(index: number) {
    return index;
  }

  save() {
    this.customMap.id = this.myGpad.id;
    localStorage.setItem('map', JSON.stringify(this.customMap))
  }

  useMap(map: any){
    console.log(map)
    setInterval(() => {
      if (this.gamepadIndex !== undefined) {
        // a gamepad is connected and has an index
        this.myGamepad$.next(navigator.getGamepads()[this.gamepadIndex]);
        if(this.myGpad !== null){
          this.myGpad.buttons
          .map((e: any) => e.pressed)
          .forEach((isPressed: any, buttonIndex: any) => {
            if (isPressed) {
              if(buttonIndex === 8){
                this.up = true;
                this.down = false;
              }
              if(buttonIndex === 5) {
                this.down = true;
                this.up = false;
              }
              if(buttonIndex !== 5 && buttonIndex !== 8) {
                this.down = false;
                this.up = false;
              }
              // button is pressed; indicate this on the page
              this.pressed[buttonIndex] = true;
              this.pressedNow = buttonIndex
            }else {
              this.pressed[buttonIndex] = false;
            }
          });
      }
        }
        
    }, 5);
  }
  setGreen(event: any){
    this.customMap.green = event.target.value;
  }
  setRed(event: any){
    this.customMap.red = event.target.value;
  }
  setYellow(event: any){
    this.customMap.yellow = event.target.value;
  }
  setBlue(event: any){
    this.customMap.blue = event.target.value;
  }
  setOrange(event: any){
    this.customMap.orange = event.target.value;
  }
  setUp(event: any) {
    this.customMap.up = event.target.value;
  }
  setDown(event: any) {
    this.customMap.down = event.target.value;
  }
  get myGpad() { 
    return this.myGamepad$.value || null;
  }

  get buttonArray() {
    if(this.mapForm){
      return this.mapForm.get('buttons') as FormArray;
    }
    
  }
}
