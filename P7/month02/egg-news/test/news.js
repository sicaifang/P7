let str = `<a href="/s?id=1599413823762210438&wfr=pc&fr=idx_top" target="_blank">
小米为5500名员工分配500亿元股票，人均909万元，上市半年后解禁
</a>
<a href="/s?id=1599513253231710086&wfr=pc&fr=idx_top" target="_blank">
魅族：高不成、低不就 15系列的求变生存恐怕不易
</a>`;

let reg = /<a href="(\/s\?id=[^"]+)".+>([\s\S]+?)<\/a>/g;

let res = str.match(reg);
console.log(res);