#!/bin/sh
# Run once from the project folder:  sh download-images.sh
mkdir -p images
curl -fsSL "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=75" -o "images/chocolate-fudge-cake.jpg" && echo "OK  chocolate-fudge-cake.jpg" || echo "FAILED chocolate-fudge-cake.jpg (the site will use the illustration instead)"
curl -fsSL "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=75" -o "images/strawberry-cream-cake.jpg" && echo "OK  strawberry-cream-cake.jpg" || echo "FAILED strawberry-cream-cake.jpg (the site will use the illustration instead)"
curl -fsSL "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=75" -o "images/red-velvet-cake.jpg" && echo "OK  red-velvet-cake.jpg" || echo "FAILED red-velvet-cake.jpg (the site will use the illustration instead)"
curl -fsSL "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=800&q=75" -o "images/artisan-sourdough-loaf.jpg" && echo "OK  artisan-sourdough-loaf.jpg" || echo "FAILED artisan-sourdough-loaf.jpg (the site will use the illustration instead)"
curl -fsSL "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=75" -o "images/classic-french-baguette.jpg" && echo "OK  classic-french-baguette.jpg" || echo "FAILED classic-french-baguette.jpg (the site will use the illustration instead)"
curl -fsSL "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=75" -o "images/multigrain-seeded-loaf.jpg" && echo "OK  multigrain-seeded-loaf.jpg" || echo "FAILED multigrain-seeded-loaf.jpg (the site will use the illustration instead)"
curl -fsSL "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=75" -o "images/fresh-seeded-bread-hero.jpg" && echo "OK  fresh-seeded-bread-hero.jpg" || echo "FAILED fresh-seeded-bread-hero.jpg (the site will use the illustration instead)"
