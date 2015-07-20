(def canvas (first (document.getElementsByTagName "canvas")))
(def ctx (canvas.getContext "2d"))

(set canvas.height window.innerHeight)
(set canvas.width window.innerWidth)

(def log
     (# (x) (/ (Math.log x) (Math.log 1.32))))

(def rad
     (# (r i)
        (Math.sqrt (+ (square r) (square i)))))

(def even-ring?
     (# (r i)
        (even? (Math.floor (log (rad r i))))))

(def rail-edge?
     (# (r i)
        (let (x (Math.abs (- (Math.abs r) (Math.abs i))))
          (and (> x (/ (rad r i) 7.5)) (< x (/ (rad r i) 6.5))))))

(def rail?
     (# (r i)
        (< (Math.abs (- (Math.abs r) (Math.abs i)))
           (/ (rad r i) 7))))

(def slat?
     (# (r i)
        (let (p (+ 1/2 (Math.floor (log (rad r i)))))
          (< (Math.abs (- (log (Math.abs i)) p))
             (/ (rad r i) 9)))))

(def dot?
     (# (r i)
        (let (p (+ 1/2 (Math.floor (log (rad r i)))))
          (< (Math.sqrt (+ (square i)
                           (* 0.95 (square (- (log (Math.abs r)) p)))))
             (/ (rad r i) 8)))))

(def color
     (# (r i)
          (if (even-ring? r i)
              (cond
               ((rail-edge? r i) "rgb(80,80,70)")
               ((rail? r i) "rgb(150,20,180)")
               ((slat? r i) "rgb(200,150,100)")
               ((dot? r i) "rgb(220,100,120)")
               (true "rgb(150,150,150)"))
            (cond
             ((rail-edge? r i) "rgb(60,60,70)")
             ((rail? r i) "rgb(20,150,180)")
             ((slat? r i) "rgb(100,200,100)")
             ((dot? r i) "rgb(190,160,110)")
             (true "rgb(255,255,255)")))))

(var params { r 0 i 0 range 4 maxIter 30 })

(def draw
     (# ()
        (times (r canvas.width)
               (times (i canvas.height)
                      (set ctx.fillStyle
                           (color
                            (+ (/ (* params.range r) canvas.width)
                               (- (half params.range)) params.r)
                            (+ (/ (* params.range i) canvas.height)
                               (- (half params.range)) params.i)))
                      (ctx.fillRect r i 1 1)))))

(draw)
