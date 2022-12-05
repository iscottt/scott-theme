var types = {
	paragraph({echo,data}) {
		echo(`<p>${data.text}</p>`);
	},
	header({echo,data}) {
		echo(`<h${data.level}>${data.text}</h${data.level}>`);
	},
	image({echo,data}) {
		if (data.href) {
			echo(`<a href="${data.href}" target="${data.opennew ? "_blank" : "_self"}">`)
		}
			echo(`<img src="${data.src}" />`);
		if (data.href) {
			echo(`</a>`)
		}
	},
	'pandastudio/tip'({echo,data}) {
		echo(`<div><p>${data.title}</p>`);
		if (typeof(data.text) == 'string') {
			echo(`<p>${data.text}</p>`);
		} else {
			renderer({echo,blocks:data.text.blocks})
		}
		echo(`</div>`);
	},
	'pandastudio/collapse'({echo,data}) {
		echo(`<details><summary>${data.title}</summary>`);
		renderer({echo,blocks:data.content.blocks})
		echo(`</details>`);
	},
	list({echo,data}) {
		var tag = data.style == 'ordered' ? 'ol' : 'ul';
		echo(`<${tag}>`);
		data.items.forEach(item=>{
			echo(`<li>${item.content}`)
			if (item.items && item.items.length > 0) {
				types.list({echo,data:{style: data.style, items: item.items}})
			}
			echo(`</li>`)
		})
		echo(`</${tag}>`);
	},
	table({echo,data}) {
		echo('<table width=100%>')
		if (data.withHeadings) {
			echo('<thead><tr>')
			data.content[0].forEach(col=>{echo(`<th>${col}</th>`)})
			echo('</tr></thead>')
		}
		echo('<tbody>')
		var content = data.withHeadings ? data.content.slice(1) : data.content;
		content.forEach(tr=>{
			echo('<tr>')
			tr.forEach(col=>{echo(`<td>${col}</td>`)})
			echo('</tr>')
		})
		echo('</tbody>')
		echo('</table>')
	},
	quote({echo,data}){
		echo(`<figure rel="quote">
			<blockquote>${data.text}</blockquote>
			<figcaption>${data.caption}</figcaption>
			</figure>`)
	},
	delimiter({echo,data}) {
		echo('<hr />');
	},
	code({echo,data}) {
		echo(`<pre>${data.pre}</pre>`);
	},
	raw({echo,data}) {
		echo(`${data.html}`);
	},
	'pandastudio/title'({echo,data}) {
		echo(`<${data.tag}>${data.text}</${data.tag}>`);
	},
	'pandastudio/columns'({echo,data}) {
		echo('<div>')
		data.columns.forEach(col=>{
			echo('<div>')
			renderer({echo,blocks:col.content.blocks})
			echo('</div>')
		})
		echo('</div>')
	},
	'pandastudio/panel'({echo,data}) {
		echo(`<div class="panel"><p>${data.title}</p>`)
		renderer({echo,blocks:data.content.blocks})
		echo('</div>')
	},
	'pandastudio/download'({echo,data}) {
		echo(`<a>下载链接</a>`)
		data.links.forEach(link=>{
			echo(`<a>${link.title}</a>`)
		})
	},
	'pandastudio/gallery'({echo,data}) {
		echo(`<ul class="gallery">`)
		data.images.forEach(img=>{
			echo(`<li><a href="${img.original}" target="_blank"><img src="${img.thumbnail || img.original}" /></a></li>`)
		})
		echo(`</ul>`)
	},
}

function renderer({echo,blocks}) {
	blocks.forEach(({type,data})=>{
		if ( types[type] ) {
			types[type]({echo,data})
		} else {
			echo(`<div><pre>
${type}：暂不支持渲染
${JSON.stringify(data)}
</pre></div>`)
		}
	})
}

module.exports = ({echo,blocks})=>{
	renderer({echo,blocks});
}