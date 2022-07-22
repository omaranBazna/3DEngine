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

class Camera {
  constructor(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }
}
