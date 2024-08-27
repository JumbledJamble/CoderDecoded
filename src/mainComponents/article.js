const Article = () => {

    let openTag = "<";
    let openSlashTag = "</";
    let closingTag = ">"; 
    let lines = [
        "The place to decode your journey as a programmer.",
        "Coder; Decoded provides visual representations of your coding experiece, allowing",
        "you to log your time and skills, creating beautiful charts to display your skills",
        "and technologies.",
    ];


    return (
        <div className = "articles">
            {
                () => {
                    for(let i = 0; i < lines.length; i++){
                        if(i = 0){
                            <div className="article">
                                <div className="tag">{openTag}</div>
                                <div className="info">info</div>
                                <div className="tag">{closingTag}</div>
                            </div>
                        }

                        {
                            <div className="text">{lines[i]}</div>
                        }

                        if(i = lines.length - 1){
                            <div className="container">
                                <div className="tag">{openSlashTag}</div>
                                <div className="info">info</div>
                                <div className="tag">{closingTag}</div>  
                            </div>
                        }
                    }
                }
            }
        </div>
        )
        

            

        
/*
             {texts.map((line) => (
                <div className="article" key = {texts.key}>
                    <div className="tag">{openTag}</div>
                    <div className="info">info</div>
                    <div className="tag">{closingTag}</div>
                    {for(let i = 0; i < line.text.length; i++){
                        <div className="text"></div>
                    }}
                    <div className="tag">{openSlashTag}</div>
                    <div className="info">info</div>
                    <div className="tag">{closingTag}</div>
                </div>*/
            
}
export default Article;