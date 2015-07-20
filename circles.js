// compiled from Hot Cocoa Lisp

var canvas, ctx, log, rad, even_hyphen_ring_question_, rail_hyphen_edge_question_, rail_question_, slat_question_, dot_question_, color, params, draw;

// (def canvas (first (document.getElementsByTagName "canvas")))

(canvas = document["getElementsByTagName"]("canvas")[0]);

// (def ctx (canvas.getContext "2d"))

(ctx = canvas["getContext"]("2d"));

// (set canvas.height window.innerHeight)

(canvas["height"] = window["innerHeight"]);

// (set canvas.width window.innerWidth)

(canvas["width"] = window["innerWidth"]);

// (def log
//      (# (x) (/ (Math.log x) (Math.log 1.32))))

(log = (function (x) {  return (Math["log"](x) / Math["log"](1.32)); }));

// (def rad
//      (# (r i)
//         (Math.sqrt (+ (square r) (square i)))))

(rad = (function (r, i) {  return Math["sqrt"](((r * r) + (i * i))); }));

// (def even-ring?
//      (# (r i)
//         (even? (Math.floor (log (rad r i))))))

(even_hyphen_ring_question_ = (function (r, i) {  return (Math["floor"](log(rad(r, i))) % 2 === 0); }));

// (def rail-edge?
//      (# (r i)
//         (let (x (Math.abs (- (Math.abs r) (Math.abs i))))
//           (and (> x (/ (rad r i) 7.5)) (< x (/ (rad r i) 6.5))))))

(rail_hyphen_edge_question_ = (function (r, i) {  return (function(x) { return (((x > (rad(r, i) / 7.5))) && ((x < (rad(r, i) / 6.5)))); }).call(this, Math["abs"]((Math["abs"](r) - Math["abs"](i)))); }));

// (def rail?
//      (# (r i)
//         (< (Math.abs (- (Math.abs r) (Math.abs i)))
//            (/ (rad r i) 7))))

(rail_question_ = (function (r, i) {  return ((Math["abs"]((Math["abs"](r) - Math["abs"](i))) < (rad(r, i) / 7))); }));

// (def slat?
//      (# (r i)
//         (let (p (+ 1/2 (Math.floor (log (rad r i)))))
//           (< (Math.abs (- (log (Math.abs i)) p))
//              (/ (rad r i) 9)))))

(slat_question_ = (function (r, i) {  return (function(p) { return ((Math["abs"]((log(Math["abs"](i)) - p)) < (rad(r, i) / 9))); }).call(this, ((1/2) + Math["floor"](log(rad(r, i))))); }));

// (def dot?
//      (# (r i)
//         (let (p (+ 1/2 (Math.floor (log (rad r i)))))
//           (< (Math.sqrt (+ (square i)
//                            (* 0.95 (square (- (log (Math.abs r)) p)))))
//              (/ (rad r i) 8)))))

(dot_question_ = (function (r, i) {  return (function(p) { return ((Math["sqrt"](((i * i) + (0.95 * ((log(Math["abs"](r)) - p) * (log(Math["abs"](r)) - p))))) < (rad(r, i) / 8))); }).call(this, ((1/2) + Math["floor"](log(rad(r, i))))); }));

// (def color
//      (# (r i)
//           (if (even-ring? r i)
//               (cond
//                ((rail-edge? r i) "rgb(80,80,70)")
//                ((rail? r i) "rgb(150,20,180)")
//                ((slat? r i) "rgb(200,150,100)")
//                ((dot? r i) "rgb(220,100,120)")
//                (true "rgb(150,150,150)"))
//             (cond
//              ((rail-edge? r i) "rgb(60,60,70)")
//              ((rail? r i) "rgb(20,150,180)")
//              ((slat? r i) "rgb(100,200,100)")
//              ((dot? r i) "rgb(190,160,110)")
//              (true "rgb(255,255,255)")))))

(color = (function (r, i) {  return (even_hyphen_ring_question_(r, i) ? (rail_hyphen_edge_question_(r, i) ? "rgb(80,80,70)" : rail_question_(r, i) ? "rgb(150,20,180)" : slat_question_(r, i) ? "rgb(200,150,100)" : dot_question_(r, i) ? "rgb(220,100,120)" : true ? "rgb(150,150,150)" : undefined) : (rail_hyphen_edge_question_(r, i) ? "rgb(60,60,70)" : rail_question_(r, i) ? "rgb(20,150,180)" : slat_question_(r, i) ? "rgb(100,200,100)" : dot_question_(r, i) ? "rgb(190,160,110)" : true ? "rgb(255,255,255)" : undefined)); }));

// (var params { r 0 i 0 range 4 maxIter 30 })

(params = { "r": 0, "i": 0, "range": 4, "maxIter": 30 });

// (def draw
//      (# ()
//         (times (r canvas.width)
//                (times (i canvas.height)
//                       (set ctx.fillStyle
//                            (color
//                             (+ (/ (* params.range r) canvas.width)
//                                (- (half params.range)) params.r)
//                             (+ (/ (* params.range i) canvas.height)
//                                (- (half params.range)) params.i)))
//                       (ctx.fillRect r i 1 1)))))

(draw = (function () {var r, i;  return (function() {var _collection_ = canvas["width"]; for (r = 0; r < _collection_; r++) { (function(r) { (function() {var _collection_ = canvas["height"]; for (i = 0; i < _collection_; i++) { (function(i) { (ctx["fillStyle"] = color((((params["range"] * r) / canvas["width"]) + (- (params["range"] / 2)) + params["r"]), (((params["range"] * i) / canvas["height"]) + (- (params["range"] / 2)) + params["i"]))); ctx["fillRect"](r, i, 1, 1); }).call(this, i); }}).call(this); }).call(this, r); }}).call(this); }));

// (draw)

draw();