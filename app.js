kaboom()

loadBean()

scene("game", () => {

  let score = 0;

  const scoreLabel = add([
      text(score),
      pos(24, 24)
  ])

  loop(0.2, () => {
    score++;
    scoreLabel.text = score;
  })

  const bean = add([
      sprite("bean"),
      pos(80, 40),
      area(),
      body(),
  ])
  
  add([
      rect(width(), 48),
      pos(0, height() - 48),
      outline(4),
      area(),
      solid(),
      color(127, 200, 255),
  ])
  
  function spawnTree(){
      add([
          rect(48, rand(24, 64)),
          area(),
          outline(4),
          pos(width(), height() - 48),
          origin("botleft"),
          color(255, 180, 255),
          move(LEFT, 240),
          'tree',
      ]);
  
      wait(rand(0.5, 1.5), () => spawnTree());
  }
  
  spawnTree();
  
  bean.onCollide('tree', () => {
    addKaboom(bean.pos);
    shake();
    let hiScore = getData('hiScore', 0);
    if(score > hiScore){
      setData('hiScore', score)
    }
    go('lose', score)
  })
  
  onKeyPress("space", () => {
    if(bean.isGrounded()){
      bean.jump()
    }
  })
});

scene("lose", (score) => {
  add([
    text("Game Over"),
    pos(center().x, center().y - 50),
    origin("center"),
])

  add([
    text("Press space to restart", {
      size: 40
    }),
    pos(center().x, center().y + 30),
    
    origin("center"),
])

  add([
      text(`Score: ${score}`, {
          size: 45
      }),
      pos(center().x, center().y + 80),
      
      origin("center"),
  ])

  add([
    text(`High Score: ${getData('hiScore')}`, {
        size: 45
    }),
    pos(center().x, center().y + 110),
    
    origin("center"),
])

  onKeyPress('space', () => {
      go('game')
  })
})

go("game")

