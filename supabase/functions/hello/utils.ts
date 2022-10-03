// parseSalary
// adapted from
// https://github.com/ChenLangChen/Jobs-Analysis-on-Seek.com.au/blob/b605be7046b4eb0647c16be359688db15176bd49/Seeker/seek.py

export function parseSalary(salaryString: string) {
  if(salaryString === "") {
    return [];
  }

  // remove extra explanation of the salary
  const regSalary = /\$\d*(?:,|k|\d*)\d*/g;
  const salary = salaryString.match(regSalary);

  var newList = [];

  if(salary) {
    for (const item of salary) {
      const newItem = item.replace('$', '').replace(',', '').replace('k', '000').replace('K', '000');
      // In case after regex, it's empty ''
      if (newItem == '') {
        newList.push(0);
      } else {
        const salaryInt = parseInt(newItem);
        newList.push(salaryInt);
      }
    }
  }

  // If newList is empty
  if (newList.length == 0) {
    return [];
  }

  // if newList isn't empty
  else {
    if (Math.max(...newList) < 500) {
      // If it's hourly rate, return empty
      return [];
    } else {
      // Sometimes it's $100 - $120k
      if (newList[0] < 1000) {
        newList[0] = newList[0] * 1000;
      }
      // We want either one or two values $30k  or  average of $30k - $40k
      return newList.slice(0, 2)
    }
  }
}

export function cleanJobTitleStrings(str: string): string {
  if(str) {
    let output = str;

    // if text contains parenthesis
    if (str.includes("(")) {
      // get the text inside the parenthesis
      const text = str.split("(")[1].split(")")[0];

      if(text.toLowerCase().includes("remote")) {
        output = str.replace(text, "");
        // remove parenthesis
        output = output.replace("(", "").replace(")", "");
      }
    }

    // if text includes "open to remote"

    if (str.toLowerCase().includes("remote")) {
      // remove case insensitive "open to remote"
      output = output.replace(/ - open to remote/gi, "");
      output = output.replace(/ - open for remote/gi, "");
      output = output.replace(/ ANZ/gi, "");
    }

    return output.trim();
  }

  return ""
}

export function determineLocation(str: string): string {
  if(str) {
    let locationStr = str.toLowerCase();
  
    if(locationStr.includes("sydney")) return "Sydney";
    if(locationStr.includes("brisbane")) return "Brisbane";
    if(locationStr.includes("adelaide")) return "Adelaide";
    if(locationStr.includes("perth")) return "Perth";
    if(locationStr.includes("darwin")) return "Darwin";
    if(locationStr.includes("hobart")) return "Hobart";
    if(locationStr.includes("melbourne")) return "Perth";
    if(locationStr.includes("canberra")) return "Canberra";
    if(locationStr.includes("gold coast")) return "Gold Coast";
  }

  return "Australia"
}

export function determineJobType(str: string): string {
  if(str) {
    const jobType = str.toLowerCase();
    if(jobType.includes("full")) return "Full Time";
    if(jobType.includes("part")) return "Part Time";
    if(jobType.includes("contract")) return "Contract";
    if(jobType.includes("intern")) return "Internship";
  }
  
  return ""
}