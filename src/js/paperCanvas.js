// set up canvas
var     canvas = document.getElementById( "paperCanvas" ),
   canvasWidth = canvas.offsetWidth,
  canvasHeight = canvas.offsetHeight,
  canvasCenter = new Point( canvasWidth / 2, canvasHeight / 2 );

var flakeRadius = 100;

var strokeColor = 'black',
    strokeWidth = 5;

function dot ( center, radius ) {
  return new Path.Circle({
    center: center,
    radius: radius,
    strokeColor: strokeColor,
    strokeWidth: strokeWidth
  });
}

function bar ( center, radius ) {
  return new Path.Line({
    from: center + [ radius, 0 ],
    to: center - [ radius, 0 ],
    strokeColor: strokeColor,
    strokeWidth: strokeWidth
  });
}

function cross ( center, radius ) {
  return new Group([
    new Path.Line({
      from: center + [ radius, radius ],
      to: center - [ radius, radius ],
      strokeColor: strokeColor,
      strokeWidth: strokeWidth
    }),
    new Path.Line({
      from: center - [ radius, - radius ],
      to: center + [ radius, - radius ],
      strokeColor: strokeColor,
      strokeWidth: strokeWidth
    })
  ]);
}

function chevron ( center, radius, direction ) {
  var chevronPath = new Group([
    new Path.Line({
      from: center + [ 0, - radius / 2 ],
      to: center + [ radius, radius / 2 ],
      strokeColor: strokeColor,
      strokeWidth: strokeWidth
    }),
    new Path.Line({
      from: center + [ 0, - radius / 2 ],
      to: center + [ - radius, radius / 2 ],
      strokeColor: strokeColor,
      strokeWidth: strokeWidth
    })
  ]);

  if ( direction === 'down' ) {
    chevronPath.rotate( 180 );
  }

  return chevronPath;
}

function triangle ( center, radius, direction ) {
  var trianglePath = new Path.RegularPolygon({
    center: center,
    sides: 3,
    radius: radius,
    strokeColor: strokeColor,
    strokeWidth: strokeWidth
  });

  if ( direction === 'down' ) {
    trianglePath.rotate( 180 );
  }

  return trianglePath;
}

var branch = new Group();

branch.addChild(
  new Path.Line({
    from: canvasCenter - [ 0, flakeRadius ],
    to: canvasCenter,
    strokeColor: strokeColor,
    strokeWidth: strokeWidth
  })
);

branch.addChild( dot( canvasCenter - [ 0, flakeRadius ], 10 ) );
branch.addChild( chevron( canvasCenter - [ 0, flakeRadius / 3 * 2 ], 10, 'down' ) );
branch.addChild( bar( canvasCenter - [ 0, flakeRadius / 3 ], 10 ) );
branch.addChild( triangle( canvasCenter, 10, 'down' ) );

var sides = 6;

for ( var s = 0; s < sides; s++ ) {
  branch.clone().rotate( 360 / sides * s, canvasCenter );
}