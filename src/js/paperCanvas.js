// set up canvas
var     canvas = document.getElementById( "paperCanvas" ),
   canvasWidth = canvas.offsetWidth,
  canvasHeight = canvas.offsetHeight,
  canvasCenter = new Point( canvasWidth / 2, canvasHeight / 2 );

var millimetreRatio = 2.835;

var strokeColor = 'black',
    strokeWidth = 2 * millimetreRatio;

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

var shapeFunctions = [
  dot,
  bar,
  cross,
  chevron,
  triangle
];

function randDir() {
  if ( Math.random() < 0.5 ) {
    return 'down';
  } else {
    return 'up';
  }
}

function randNum ( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1) ) + min;
}

var flakeRadius = 30 * millimetreRatio;

var margin = 5 * millimetreRatio;

function drawFlake ( left, top ) {
  var branch = new Group();
  var branchCenter = new Point( flakeRadius + left, flakeRadius + top );
  var sides = randNum( 5, 7 );

  branch.addChildren([
    new Path.Line({
      from: branchCenter - [ 0, flakeRadius ],
      to: branchCenter,
      strokeColor: strokeColor,
      strokeWidth: strokeWidth
    }),
    shapeFunctions[ randNum( 0, shapeFunctions.length -1 ) ]( branchCenter, 15, randDir() ),
    shapeFunctions[ randNum( 0, shapeFunctions.length -1 ) ]( branchCenter - [ 0, flakeRadius / 3 ], 12, randDir() ),
    shapeFunctions[ randNum( 0, shapeFunctions.length -1 ) ]( branchCenter - [ 0, flakeRadius / 3 * 2 ], 10, randDir() ),
    shapeFunctions[ randNum( 0, shapeFunctions.length -1 ) ]( branchCenter - [ 0, flakeRadius ], 12, randDir() )
  ]);

  for ( var s = 0; s < sides; s++ ) {
    branch.clone().rotate( 360 / sides * s, branchCenter );
  }
}

drawFlake( 25, 30 );
drawFlake( 50 + flakeRadius * 2, 30 );
drawFlake( 75 + flakeRadius * 4, 30 );
drawFlake( 100 + flakeRadius * 6, 30 );

drawFlake( 25, 300 );
drawFlake( 50 + flakeRadius * 2, 300 );
drawFlake( 75 + flakeRadius * 4, 300 );
drawFlake( 100 + flakeRadius * 6, 300 );

var svgContent = new Blob(
  [ '<?xml version="1.0" encoding="utf-8"?>' + project.exportSVG({ asString: true }) ],
  { type: "text/plain;charset=utf-8" }
);

$( '#save-btn' ).click( function() {
  saveAs( svgContent, 'test.svg' );
});