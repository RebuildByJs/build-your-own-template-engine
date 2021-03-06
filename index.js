const TemplateEngine = function (tpl, data) {
  const re = /{{(.+?)}}/g;
  const { addLine, insert, transform } = templateHandler(tpl);
  while (match = re.exec(tpl)) {
    let [placeholder, prop] = match;

    addLine({ index: match.index });
    insert({ 
      startIndex: match.index,
      placeholder,
      prop: prop.trim()
    });
  }
  
  let code = transform();
  return new Function(code.replace(/[\r\t\n]/g, '')).call(data);

  function templateHandler (template) {
    let code = ['let template = [];\n'];
    let codeEnd = 'return template.join("");\n';
    let cursor = 0;
    const sentRe = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
    return {
      addLine: ({index}) => {
        let line = template.slice(cursor, index);
        code.push(`template.push("${line.replace(/('|")/g, '\\$1')}");\n`);
      },
      insert: ({startIndex, placeholder, prop}) => {
        prop = prop.replace(/(^\s+)|(\s+$)/g, '');
        if (prop.match(sentRe)) {
          code.push(`${prop}\n`);
        } else {
          code.push(`template.push(this.${prop});\n`);
        }
        cursor = startIndex + placeholder.length;
      },
      transform: () => {
        code.push(`template.push("${template.substr(cursor, tpl.length - cursor)}");\n`);
        code.push(codeEnd);
        return code.join('');
      }
    }
  }
};

module.exports = TemplateEngine;