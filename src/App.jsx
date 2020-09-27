import React, {useEffect, useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'
import Newscards from "./components/NewsCards/NewsCards";
import useStyles from './styles'
import wordsToNumbers from "words-to-numbers";

const alanKey = 'f51b6f9c94b27bdedcd9593b6142880e2e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

    const [newsArticles, setNewsAriticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)
    const classes = useStyles()
    console.log('d')
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                switch (command) {
                    case 'newHeadlines':
                        setNewsAriticles(articles)
                        setActiveArticle(-1)
                        break
                    case 'highlight':
                        setActiveArticle((prevActiveArticle)=> ++prevActiveArticle)
                        break
                    case 'open':
                        const parsedNumber = number.length > 2 ? wordsToNumbers(number,{fuzzy:true}) : number
                        console.log('the number is ', parsedNumber)
                        if(isNaN(parsedNumber)){
                            console.log(parsedNumber)
                            alanBtn().playText(`There is no article with that number!`)
                            break
                        }


                        if(parsedNumber > articles.length || parsedNumber <= 0){
                            alanBtn().playText(`There is no article with that number!`)

                        }else{

                            const article = articles[parsedNumber-1]

                            alanBtn().playText('Sure!')
                            window.open(article.url,'_blank')
                        }


                        break


                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" alt="Alan logo" className={classes.alanLogo}/>

            </div>
            <Newscards articles = {newsArticles} activeArticle={activeArticle}/>
        </div>
    );
};

export default App;
