// set up canvas
var     canvas = document.getElementById( "paperCanvas" ),
   canvasWidth = canvas.offsetWidth,
  canvasHeight = canvas.offsetHeight,
  canvasCenter = new Point( canvasWidth / 2, canvasHeight / 2 );

// convert pixels to millimeters
var millimetreRatio = 2.835;

// stoke settings
var strokeColor = 'black',
    strokeWidth = 2 * millimetreRatio,
    strokeCap = 'round';

// shape functions
// =================================================
var shapeFunctions = [
  dot,
  cross,
  chevron,
  triangle,
  bar
];

function dot ( center, radius ) {
  return new Path.Circle({
    center: center,
    radius: radius / 3,
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

function chevron ( center, radius ) {
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

  chevronPath.rotate( 180 );

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
// end shape functions
// =================================================

// get a random direction
function randDir() {
  if ( Math.random() < 0.5 ) {
    return 'down';
  } else {
    return 'up';
  }
}

// random num wrapper
function randNum ( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1) ) + min;
}

// size of snowflake
var flakeRadius = 15 * millimetreRatio;

// build  a snowflake
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
    shapeFunctions[ randNum( 1, shapeFunctions.length -1 ) ]( branchCenter, 12, randDir() ),
    shapeFunctions[ randNum( 1, shapeFunctions.length -1 ) ]( branchCenter - [ 0, flakeRadius / 2 ], 10, randDir() ),
    shapeFunctions[ randNum( 0, shapeFunctions.length -3 ) ]( branchCenter - [ 0, flakeRadius ], 8, randDir() )
  ]);

  for ( var s = 0; s < sides; s++ ) {
    branch.clone().rotate( 360 / sides * s, branchCenter );
  }
}

var spacer = 130;

// draw some snowflakes
drawFlake( 31.5, 80 );
drawFlake( 31.5, 595.3 - ( 80 + flakeRadius * 2 ) );

drawFlake( 31.5 + spacer, 80 );
drawFlake( 31.5 + spacer, 595.3 - ( 80 + flakeRadius * 2 ) );

drawFlake( 31.5 + spacer * 2, 80 );
drawFlake( 31.5 + spacer * 2, 595.3 - ( 80 + flakeRadius * 2 ) );

drawFlake( 31.5 + spacer * 3, 80 );
drawFlake( 31.5 + spacer * 3, 595.3 - ( 80 + flakeRadius * 2 ) );

drawFlake( 31.5 + spacer * 4, 80 );
drawFlake( 31.5 + spacer * 4, 595.3 - ( 80 + flakeRadius * 2 ) );

drawFlake( 31.5 + spacer * 5, 80 );
drawFlake( 31.5 + spacer * 5, 595.3 - ( 80 + flakeRadius * 2 ) );

var textOptions = {
  fontFamily: 'miso-skinny',
  fillColor: 'black',
  fontWeight: 100
};

var names = [
  'FLORIAN',
  'MARK',
  'TU TAK',
  'KATHARINE',
  'ALISON',
  'CHARLES'
];

new PointText( textOptions ).set({
  content: names[0],
  fontSize: 60,
  rotation: 90,
  position: new Point( 70, canvasHeight / 2 )
});

new PointText( textOptions ).set({
  content: names[1],
  fontSize: 60,
  rotation: 90,
  position: new Point( 70 + spacer, canvasHeight / 2 )
});

new PointText( textOptions ).set({
  content: names[2],
  fontSize: 60,
  rotation: 90,
  position: new Point( 70 + spacer * 2, canvasHeight / 2 )
});

new PointText( textOptions ).set({
  content: names[3],
  fontSize: 60,
  rotation: 90,
  position: new Point( 70 + spacer * 3, canvasHeight / 2 )
});

new PointText( textOptions ).set({
  content: names[4],
  fontSize: 60,
  rotation: 90,
  position: new Point( 70 + spacer * 4, canvasHeight / 2 )
});

new PointText( textOptions ).set({
  content: names[5],
  fontSize: 60,
  rotation: 90,
  position: new Point( 70 + spacer * 5, canvasHeight / 2 )
});


// save the content to a file.
// =================================================
var svgContent = new Blob(
  [ '<?xml version="1.0" encoding="utf-8"?>' + project.exportSVG({ asString: true }) ],
  { type: "text/plain;charset=utf-8" }
);

$( '#save-btn' ).click( function() {
  saveAs( svgContent, 'test.svg' );
});