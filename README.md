# PROS VEX V5 six-motor drivetrain + pneumatics

Starter PROS project source for a VEX V5 robot using a six-motor, tank-style drivetrain and two independently controlled pneumatic outputs.

## Hardware map

| Smart Port | Device | Configuration |
| --- | --- | --- |
| 1, 2, 3 | Left drivetrain motors | 600 RPM blue cartridges; port 2 reversed |
| 4, 5, 6 | Right drivetrain motors | 600 RPM blue cartridges; port 5 reversed |
| 7 | Pneumatic solenoid 1 | Digital output; `L1` extends, `L2` retracts |
| 8 | Pneumatic solenoid 2 | Digital output; `R1` extends, `R2` retracts |

Set the V5 Controller to the robot in PROS/ VEX field configuration. In driver control, controller sticks operate the drivetrain: left stick Y controls left side; right stick Y controls right side (tank drive). Each piston has dedicated extend and retract buttons. A newly started program assumes both pistons retracted.

**Pneumatics note:** ports 7 and 8 are three-wire digital outputs intended to drive compatible solenoid interfaces, not bare solenoid coils directly. Verify the pneumatic system, solenoid interface, pressure, and wiring against VEX hardware documentation before connecting. Change the port constants to match your actual robot. Never actuate an unmounted mechanism or put hands near a moving cylinder.

## Build and deploy

This is a PROS source starter, not a generated `.pros` project (this checkout had no existing project metadata or toolchain). Create a V5 project with the PROS CLI or VS Code PROS extension, then copy `include/main.h` and `src/main.cpp` into it and build/upload with that project. The code uses standard PROS V5 APIs. Confirm the installed PROS version supports the API and that all ports match the physical robot before enabling motors.

## Driver controls

- Left stick Y: left drivetrain side
- Right stick Y: right drivetrain side
- L1 / L2: extend / retract piston 1
- R1 / R2: extend / retract piston 2

The motor groups use a 600 RPM cartridge and brake when joystick input returns to zero. Piston commands are latched: press the extend or retract button to set the output; releasing the button does not change its state. Pressing both buttons for a piston at once is ignored, preserving its prior state.