let username = localStorage.getItem("username")
export default {
     data: [{
        Position:'ddd',
        MatName:'ddd',
        MatDesc:'ddd',
        Diameter:'ddd',
        Quantity:'ddd',
        GroNumber:'ddd',
        LossRate:'ddd'
     }],
     columns: [
        { label: '方向', prop: 'Position' },
        { label: '物料', prop: 'MatName'},
        { label: '描述', prop: 'MatDesc'},
        { label: '直径', prop: 'Diameter'},
        { label: '数量', prop: 'Quantity'},
        { label: '组数', prop: 'GroNumber' },
        { label: '损耗率', prop: 'LossRate'},
      ],
      base: {
        '基本信息': [
          {
              key:'MatNumber',
              title:'物料编号',
              value:'',
              
              isInput:true
          },
          {
              key:'MatName',
              title:'物料名称',
              value:'',
              isInput:true
          },
          {
            key:'Creator',
            title:'创建者',
            value: username ,
            width:'50%',
            isInput:true
        }]
    }
      
}