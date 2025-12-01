'use strict';

function repo_init(){
    core_repo_init({
      'globals': {
        'gears': [],
      },
      'storage': {
        'count': 10,
        'interval': 100,
        'interval_rotation': .1,
        'ratio': 10,
        'rotations': 0,
      },
      'storage_menu': '<table><tr><td><input class=mini id=count min=1 step=1 type=number><td>Count'
        + '<tr><td><input class=mini id=interval step=any type=number><td>Interval'
        + '<tr><td><input class=mini id=interval_rotation step=any type=number><td>Interval Rotation'
        + '<tr><td><input class=mini id=ratio step=any type=number><td>Ratio'
        + '<tr><td><input class=mini id=rotations min=0 step=1 type=number><td>Rotations of Gear 1</table>',
      'title': 'Gears.htm',
      'ui_elements': [
        'result',
      ],
    });

    for(let i = 0; i < core_storage_data.count; i++){
        gears.push({
          'rotation': 0,
          'total': 0,
        });
    }

    for(let i = 0; i < core_storage_data.rotations; i++){
        rotate_gears(false);
    }
    update_table();

    core_interval_modify({
      'id': 'interval',
      'interval': core_storage_data.interval,
      'todo': rotate_gears,
    });
}

function rotate_gears(update){
    let result = '';
    for(let i = 0; i < gears.length; i++){
        const rotation = Math.pow(
          core_storage_data.ratio,
          -i
        ) * core_storage_data.interval_rotation;
        gears[i].rotation += rotation;

        if(gears[i].rotation >= 1){
            gears[i].rotation -= 1;
            gears[i].total += 1;
        }
    }
    core_elements.result.innerHTML = result;

    if(update !== false){
        update_table();
    }
}

function update_table(){
    let result = '';
    for(let i = 0; i < gears.length; i++){
        result += '<tr><td>' + (i + 1)
          + '<td>' + core_round({
            'number': (gears[i].rotation * 100),
          }) + '%<td>' + core_number_format({
            'number': gears[i].total,
          });
    }
    core_elements.result.innerHTML = result;
}
