///the function to calculate the cross product

function crossProduct(vect_A, vect_B) {
  let result = [];
  result[0] = vect_A[1] * vect_B[2] - vect_A[2] * vect_B[1];
  result[1] = vect_A[2] * vect_B[0] - vect_A[0] * vect_B[2];
  result[2] = vect_A[0] * vect_B[1] - vect_A[1] * vect_B[0];

  return result;
}

///define class for point3D in the 3D space
class Point3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
///define class for point2D on the virtual camera

class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//define class for the virtual camera
//the camera face the virtual x-axis in the virtual space
///the camera rotate around the z-axis alpha angle
///the camera make an angle beta with the x-y plan

class Camera {
  constructor(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }

  rotate(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }

  project(Point3D) {
    const x = Point3D.x;
    const y = Point3D.y;
    const z = Point3D.z;

    ///define the x,y,z vector of the camera direction toward the center of the virtual world
    let nx, ny, nz, n;
    nx = Math.cos(this.alpha) * Math.cos(this.beta);
    ny = Math.sin(this.alpha) * Math.cos(this.beta);
    nz = Math.sin(this.beta);
    n = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx = nx / n;
    ny = ny / n;
    nz = nz / n;
    n = [nx, ny, nz];

    let camera_x_axis = [-Math.sin(this.alpha), Math.cos(this.alpha), 0];

    ///camera y axis is the cross product of x_axis and camera direction toward the center
    let camera_y_axis = crossProduct(camera_x_axis, n);

    let point = new Point2D(
      camera_x_axis[0] * x + camera_x_axis[1] * y + camera_x_axis[2] * z,
      camera_y_axis[0] * x + camera_y_axis[1] * y + camera_y_axis[2] * z
    );

    return point;
  }
}
///we need to add canvas object
let camera = new Camera(-Math.PI / 4, Math.PI / 4);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let xo = 300;
let yo = 300;
let angle = -Math.PI / 4;

///creating the cube

let p1 = new Point3D(0, 0, 0);
let p2 = new Point3D(0, 100, 0);
let p3 = new Point3D(100, 0, 0);
let p4 = new Point3D(100, 100, 0);
let p5 = new Point3D(0, 0, 100);
let p6 = new Point3D(0, 100, 100);
let p7 = new Point3D(100, 0, 100);
let p8 = new Point3D(100, 100, 100);
let beta = Math.PI / 4;
setInterval(() => {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 600, 600);

  camera.rotate(angle, beta);
  let xAxis = new Point3D(300, 0, 0);
  let x_axis = camera.project(xAxis);
  ctx.beginPath();
  ctx.strokeStyle = "#FF0000";
  ctx.moveTo(xo, yo);
  ctx.lineTo(xo + x_axis.x * 1, yo + x_axis.y * 1);
  ctx.stroke();
  let yAxis = new Point3D(0, 300, 0);
  let y_axis = camera.project(yAxis);

  ctx.beginPath();
  ctx.strokeStyle = "#00FF00";
  ctx.moveTo(xo, yo);
  ctx.lineTo(xo + y_axis.x * 1, yo + y_axis.y * 1);
  ctx.stroke();
  let zAxis = new Point3D(0, 0, 300);
  let z_axis = camera.project(zAxis);
  ctx.strokeStyle = "#0000FF";
  ctx.beginPath();
  ctx.moveTo(xo, yo);
  ctx.lineTo(xo + z_axis.x * 1, yo + z_axis.y * 1);
  ctx.stroke();

  let p1_p = camera.project(p1);
  let p2_p = camera.project(p2);
  let p3_p = camera.project(p3);
  let p4_p = camera.project(p4);
  let p5_p = camera.project(p5);
  let p6_p = camera.project(p6);
  let p7_p = camera.project(p7);
  let p8_p = camera.project(p8);

  ///creating a sphere
  let sphere = [];
  for (let i = 0; i < 15; i++) {
    sphere[i] = [];
    for (let u = 0; u < 15; u++) {
      sphere[i][u] = [
        200 +
          100 *
            Math.cos((Math.PI * 2 * i) / 10) *
            Math.cos((Math.PI * (u - 5)) / 10),
        100 *
          Math.sin((Math.PI * 2 * i) / 10) *
          Math.cos((Math.PI * (u - 5)) / 10),
        120 + 100 * Math.sin((Math.PI * (u - 5)) / 10),
      ];
    }
  }

  ctx.strokeStyle = "#000000";

  //drawing the bottom face
  ctx.beginPath();
  ctx.moveTo(xo + p1_p.x, yo + p1_p.y);
  ctx.lineTo(xo + p2_p.x, yo + p2_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p1_p.x, yo + p1_p.y);
  ctx.lineTo(xo + p3_p.x, yo + p3_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p2_p.x, yo + p2_p.y);
  ctx.lineTo(xo + p4_p.x, yo + p4_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p3_p.x, yo + p3_p.y);
  ctx.lineTo(xo + p4_p.x, yo + +p4_p.y);
  ctx.stroke();

  ///drawing the top face
  ctx.beginPath();
  ctx.moveTo(xo + p5_p.x, yo + p5_p.y);
  ctx.lineTo(xo + p6_p.x, yo + p6_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p5_p.x, yo + p5_p.y);
  ctx.lineTo(xo + p7_p.x, yo + p7_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p6_p.x, yo + p6_p.y);
  ctx.lineTo(xo + p8_p.x, yo + p8_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p7_p.x, yo + p7_p.y);
  ctx.lineTo(xo + p8_p.x, yo + +p8_p.y);
  ctx.stroke();

  ///drawing the left face
  ctx.beginPath();
  ctx.moveTo(xo + p1_p.x, yo + p1_p.y);
  ctx.lineTo(xo + p5_p.x, yo + p5_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p5_p.x, yo + p5_p.y);
  ctx.lineTo(xo + p6_p.x, yo + p6_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p6_p.x, yo + p6_p.y);
  ctx.lineTo(xo + p2_p.x, yo + p2_p.y);
  ctx.stroke();

  ///drawing the right face
  ctx.beginPath();
  ctx.moveTo(xo + p3_p.x, yo + p3_p.y);
  ctx.lineTo(xo + p7_p.x, yo + p7_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p7_p.x, yo + p7_p.y);
  ctx.lineTo(xo + p8_p.x, yo + p8_p.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xo + p4_p.x, yo + p4_p.y);
  ctx.lineTo(xo + p8_p.x, yo + p8_p.y);
  ctx.stroke();

  ///draw the sphere object
  let sphere_p = [];
  //project the sphere
  for (let i = 0; i < 15; i++) {
    sphere_p[i] = [];
    for (let u = 0; u < 15; u++) {
      sphere_p[i][u] = camera.project(
        new Point3D(sphere[i][u][0], sphere[i][u][1], sphere[i][u][2])
      );
    }
  }

  //draw the sphere

  for (let i = 0; i < 14; i++) {
    for (let u = 0; u < 14; u++) {
      ctx.beginPath();
      ctx.moveTo(xo + sphere_p[i][u].x, yo + sphere_p[i][u].y);
      ctx.lineTo(xo + sphere_p[i + 1][u].x, yo + sphere_p[i + 1][u].y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xo + sphere_p[i][u].x, yo + sphere_p[i][u].y);
      ctx.lineTo(xo + sphere_p[i][u + 1].x, yo + sphere_p[i][u + 1].y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xo + sphere_p[i + 1][u].x, yo + sphere_p[i + 1][u].y);
      ctx.lineTo(xo + sphere_p[i + 1][u + 1].x, yo + sphere_p[i + 1][u + 1].y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xo + sphere_p[i][u].x, yo + sphere_p[i][u].y);
      ctx.lineTo(xo + sphere_p[i][u + 1].x, yo + sphere_p[i][u + 1].y);
      ctx.stroke();
    }
  }
}, 100);

function up() {
  beta += 0.1;
}
function down() {
  beta -= 0.1;
}
function left() {
  angle -= 0.1;
}
function right() {
  angle += 0.1;
}
