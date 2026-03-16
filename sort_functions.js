function Aksort(data, k)
{
	let aux = [];
	data.forEach((v, i) => {aux.push(v)});
	aux.sort((a, b) => a[k] > b[k] ? 1 : a[k] < b [k] ? -1 : 0);
	return aux;
}

function Akrsort(data, k)
{
	let aux = [];
	data.forEach((v, i) => {aux.push(v)});
	aux.sort((a, b) => a[k] < b[k] ? 1 : a[k] > b [k] ? -1 : 0);
	return aux;
}

function Oasort(data)
{
	let aux = [];
	Object.keys(data).forEach((v) => {aux.push({k:data[v], p:`${v}`})});
	aux = Aksort(aux, `k`);
	let aux2 = [];
	aux.map((v)=>{aux2[v.p] = !isNaN(v.k) ? parseInt(v.k) : v.k});
	return aux2;
}

function Oarsort(data)
{
	let aux = [];
	Object.keys(data).forEach((v) => {aux.push({k:data[v], p:`${v}`})});
	aux = Akrsort(aux, `k`);
	let aux2 = [];
	aux.map((v)=>{aux2[v.p] = !isNaN(v.k) ? parseInt(v.k) : v.k});
	return aux2;
}