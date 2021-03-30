<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

  <?php 
    echo 'Hola <br>';
      $feed = simplexml_load_file('https://xchile.cl/?feed=rss2');
      foreach ($feed->channel->item as $item) {
          $title       = (string) $item->title;
          $description = (string) $item->description;

          print '<div>';

          printf(
            '<h2>%s</h2><p>%s</p>', 
            $title, 
            $description
        );

          if ($media = $item->children('media', TRUE)) {
            if ($media->content->thumbnail) {
              $attributes = $media->content->thumbnail->attributes();
              $imgsrc     = (string)$attributes['url'];

              printf('<div><img src="%s" alt="" /></div>', $imgsrc);
          }
        }

        echo '</div>';
      }
    ?>
    
</body>
</html>