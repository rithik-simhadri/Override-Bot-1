# PROS VEX V5 six-motor drivetrain + pneumatics

Starter PROS source for a VEX V5 robot with a six-motor, tank-drive drivetrain and two independently controlled pneumatic outputs.

## Hardware map

| V5 connection | Device | Configuration |
| --- | --- | --- |
| Smart Port 1 | Left-front drive motor | 600 RPM blue cartridge, not reversed |
| Smart Port 2 | Left-middle drive motor | 600 RPM blue cartridge, reversed |
| Smart Port 3 | Left-rear drive motor | 600 RPM blue cartridge, not reversed |
| Smart Port 4 | Right-front drive motor | 600 RPM blue cartridge, reversed |
| Smart Port 5 | Right-middle drive motor | 600 RPM blue cartridge, not reversed |
| Smart Port 6 | Right-rear drive motor | 600 RPM blue cartridge, reversed |
| ADI A | Pneumatic valve control 1 | `L1` extends; `L2` retracts |
| ADI B | Pneumatic valve control 2 | `R1` extends; `R2` retracts |

ADI A/B are three-wire outputs on the V5 brain, not Smart Ports 7/8. The program constructs the controller as the master (`E_CONTROLLER_MASTER`); pair/connect the physical V5 Controller to the brain in the VEX/PROS workflow. Left stick Y drives the left motor group, right stick Y drives the right motor group (tank control).

Each pneumatic output is latched: press its extend or retract button to set the output; releasing the button does not change its state. If both buttons for one piston are pressed simultaneously, its previous output is retained. Both outputs initialize to false/retracted when program starts.

**Pneumatics safety:** ADI A/B can only operate a compatible solenoid valve/interface within its electrical ratings. Do not connect bare solenoid coils directly. Confirm valve wiring, pneumatic pressure, and mechanism mounting with the hardware documentation before use. Keep hands clear of moving cylinders, and test with the robot safely supported.

## Build and deploy

This repository contains PROS source files, not a generated `.pros` project or an installed PROS toolchain. Create a V5 project with the PROS CLI or VS Code PROS extension, then place `include/main.h` and `src/main.cpp` in that project's matching folders. Build and upload from the configured PROS project. Confirm the PROS API/toolchain version and physical port wiring before enabling the robot.

Run the repository's source configuration checks with `node --test tests/configuration.test.js`. These verify source/configuration expectations; they do not replace a PROS build, hardware inspection, or robot test.