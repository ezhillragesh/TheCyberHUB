import React, { useState } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import {
    BackArrow,
    Checkbox,
    CheckboxContainer,
    Content,
    ContentHeading,
    ContentList,
    ContentNavigation,
    Days,
    ForwardArrow,
    LearningPathContainer,
    LearningPathWrapper,
    LeftContainer,
    NavigationButtonSection,
    RightContainer,
    SectionHeading,
    TopicBox,
    VLine,
    Weeks,
} from "./LearningPathElements";
import LearningPathData from "./LearningPathData";

const LearningPath = () => {
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [showNavigation, setShowNavigation] = useState(true);

    const handleHeadingClick = (heading) => {
        setSelectedHeading(heading);
        setSelectedContent(heading);
    };
    const handleContentNavigation = () => {
        setShowNavigation(!showNavigation);
    };

    return (
        <Wrapper>
            <LearningPathWrapper>
                <SectionHeading> {"Complete Cyber Security Course".toUpperCase()} </SectionHeading>
                <NavigationButtonSection>
                    {showNavigation ? (
                        <BackArrow onClick={handleContentNavigation} />
                    ) : (
                        <ForwardArrow onClick={handleContentNavigation} />
                    )}
                </NavigationButtonSection>
                <LearningPathContainer>
                    {showNavigation && (
                        <>
                            <LeftContainer>
                                <ContentNavigation>
                                    {LearningPathData.map((data) => (
                                        <ContentList key={data.id}>
                                            {data?.weeks.map((week) => (
                                                <Weeks key={week.week}>
                                                    <h2>{week.week}</h2>
                                                    {week?.days.map((days) => (
                                                        <Days key={days.id}>
                                                            <h3>{days.day}</h3>
                                                            {days.contents.map((content) => (
                                                                <TopicBox
                                                                    key={content.id}
                                                                    onClick={() => handleHeadingClick(content.heading)}
                                                                    isSelected={content.heading === selectedContent}
                                                                >
                                                                    <ContentHeading>{content.heading}</ContentHeading>
                                                                    <CheckboxContainer>
                                                                        <Checkbox
                                                                            id={content.heading}
                                                                            value={content.heading}
                                                                            isSelected={
                                                                                content.heading === selectedContent
                                                                            }
                                                                            type="checkbox"
                                                                        />
                                                                    </CheckboxContainer>
                                                                </TopicBox>
                                                            ))}
                                                        </Days>
                                                    ))}
                                                </Weeks>
                                            ))}
                                        </ContentList>
                                    ))}
                                    {/* <HLine/> */}
                                </ContentNavigation>
                            </LeftContainer>
                            <VLine />
                        </>
                    )}
                    <RightContainer>
                        <Content>
                            {selectedHeading &&
                                LearningPathData.find((data) =>
                                    data.weeks.find((week) =>
                                        week.days.find((days) =>
                                            days.contents.find((content) => content.heading === selectedHeading),
                                        ),
                                    ),
                                )
                                    .weeks.find((week) =>
                                        week.days.find((days) =>
                                            days.contents.find((content) => content.heading === selectedHeading),
                                        ),
                                    )
                                    .days.find((days) =>
                                        days.contents.find((content) => content.heading === selectedHeading),
                                    )
                                    .contents.find((content) => content.heading === selectedHeading).content}
                        </Content>
                    </RightContainer>
                </LearningPathContainer>
            </LearningPathWrapper>
        </Wrapper>
    );
};

export default LearningPath;
