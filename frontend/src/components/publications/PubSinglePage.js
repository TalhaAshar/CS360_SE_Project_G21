import React from 'react'
import styled from 'styled-components'
import Cards from './Cards'
function PubSinglePage() {
    return (
        <Container>
            <BookTitleContainer>BOOK TITLE</BookTitleContainer>
            <BookContainer>
                <BookImageDetailContainer>
                    <Image src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Y3NzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" width="470px" height ="590px"/>
                    <PublicationID>Publcation ID:234345435 </PublicationID>
                    <BookDetails>
                        <Text>Author:</Text>
                        <Text>Publisher:</Text>
                        <Text>Edition:</Text>
                        <Text>Year:</Text>
                        <Text>Language:</Text>
                        <Text>ISBN:</Text>
                    </BookDetails>
                </BookImageDetailContainer>
                <BookDescriptionComment>
                    <BookComment>
                        <Text>Comment:</Text>
                        <Comment>
                        If this is best edition
                        </Comment>
                    </BookComment>
                    <BookDescription>
                        <Text>Description:</Text>
                        <Description>
                            Description of the book
                            This particular edition contains the true, unabridged, writings by Johanna Spyri as confirmed by her editor in the foreword.
                            Not only does it contain the illustrations hand-drawn by the author, which are reproduced for the purpose of the edition by Puffin Books, but also contains excerpts from the author’s own personal experiences in the Alps as part of the appendix at the end of the book. No other edition of Heidi contains these extra snippets.
                        </Description>
                    </BookDescription>
                </BookDescriptionComment>
            </BookContainer>
            <BookRelatedEditionContainer>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
            </BookRelatedEditionContainer>
        </Container>
    )
}

export default PubSinglePage

const Container = styled.div`
    max-width:1360px;
    max-height:1840px;
    margin-left:50px;
    margin-right:50px;
`
const BookTitleContainer = styled.div`
    background: #0A3977;
    border-radius:20px;
    color:white;
    min-width: 150px;
    min-height:60px;
    margin-top:20px;
    display:flex;
    justify-content:center;
    align-items:center;


`

const BookContainer = styled.div`
    display:flex;
    max-width: 1150px;
    max-height: 1180px;
    margin-left: 10px;
    margin-top: 20px;
    margin-right:20px;

    background: conic-gradient(from 180deg at 50% 50%, #C2B8F9 -1.73deg, #D8E0F1 17.35deg, #CDC3FF 127.58deg, #BCD1FF 142.95deg, #BCD1FF 157.82deg, #CDC4FF 168.37deg, rgba(3, 134, 175, 0.95) 238.02deg, rgba(6, 129, 168, 0.95) 313.27deg, #C2B8F9 358.27deg, #D8E0F1 377.35deg);
    border-radius: 16px;
`
const BookImageDetailContainer = styled.div`

`
const Image = styled.img`
    margin-top:20px;
    margin-left:20px;
    border-radius: 16px 16px 0px 0px;
`
const BookDetails = styled.div`
    max-width: 470px;
    max-height: 306px;

    background: #FFFFF5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom:20px;
    margin-left:20px;
    padding-left:10px;
    padding-right:10px;
    padding-top:10px;
    padding-bottom:10px;
`
const Text = styled.p`

`
const PublicationID = styled.h3`
    margin-left:100px;
`

const BookDescriptionComment = styled.div`
/* White */
    background: #FFFFFF;
    border-radius: 16px;
    max-width:600px;
    max-height:1000px;
    padding-left:10px;
    padding-right:10px;
    padding-top:20px;
    margin-left:37px;
    margin-top:20px;
    margin-bottom:20px;
`
const BookComment = styled.div`
    background: #DCF2F8;
    border-radius: 16px;
    padding-left:10px;
    padding-right:10px;
    padding-top:20px;
    padding-bottom:10px;
    
`

const Comment = styled.h5`
`
const BookDescription = styled.div`
    margin-top:20px;
    background: #DCF2F8;
    border-radius: 16px;
    padding-left:10px;
    padding-right:10px;
    padding-top:20px;
    padding-bottom:10px;
`
const Description = styled.h5`

`
const BookRelatedEditionContainer = styled.div`

    width: 1150px;
    height: 393px;
    margin-left:10px;
    margin-top:20px;
    padding-left:70px;

    background: #DCF2F8;
    border-radius: 16px;
    display:grid;
    grid-template-columns: 250px 250px 250px 250px;

`
