import { ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { of,throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService:any;
  let mockRouter:any;

  beforeEach(async () => {
    mockAuthService={
      login: jasmine.createSpy(),
      saveToken: jasmine.createSpy(),
      isLoggedIn: jasmine.createSpy().and.returnValue(false)
    }
    mockRouter={
      navigate: jasmine.createSpy()
    }
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers:[{provide: AuthService,useValue:mockAuthService},
        {provide: Router,useValue:mockRouter}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });
  it('should call AuthService.login and navigate to /home on success',fakeAsync(()=>{
    const token='mockToken';
    mockAuthService.login.and.returnValue(of({token}));
    component.email = 'test@example.com';
    component.password = 'password123';
    component.onSubmit();
    tick();
    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com','password123');
    expect(mockAuthService.saveToken).toHaveBeenCalledWith(token);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  }));
  it('should set error message on login failure',fakeAsync(()=>{
    mockAuthService.login.and.returnValue(throwError(()=>new Error('Invalid credentials')));
    component.email = 'wrong@example.com';
    component.password = 'wrongpass';
    component.onSubmit();
    tick();
    expect(component.error).toBe('Invalid credentials');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }))
});