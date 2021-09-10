import { Row, Col, Typography } from "antd";

/**
 * Provides information about Approach and Disclaimer
 */
export default function About() {
  return (
    <Row>
      <Col xs={24}>
        <Typography.Title level={3}>About the Project!</Typography.Title>
        <Typography.Paragraph>
            Hi, Thank you for trying out this service, I hope this service has helped you/someone you know get vaccinated. If not, please let me know what improvements can be made that you think would help more people.
        
            Here you'll find more information about motivation of building this project,
            and how to contact regarding information that is outdated.
        </Typography.Paragraph>

        <Typography.Title level={4}>Why did I build this?</Typography.Title>
        <Typography.Paragraph>
            I felt the need of this project because the number of vaccination centres in Pakistan 
            are not properly documented and there's not much information available 
            on the internet about the one that might be closest to you. 

            This application takes the data provided by the government and tries 
            it's best to make it more user-friendly and accessible. 

            Achievement of Herd Immunity is one of the biggest challenge our society 
            faces right now and you should be able to vaccinate, no matter where you are in Pakistan,
            and from what I see, Govt. has done a good job of establishing vaccination centres in 
            different communities, so the excuse shoudn't be there. :) 
        </Typography.Paragraph>


        <Typography.Title level={4}>What's my data source?</Typography.Title>
        <Typography.Paragraph>
            The original data source is a <a href="https://ncoc.gov.pk/facilities/MVCs_CVCs.pdf">PDF</a> which as of writing this is the first organic search result on Google. I parsed and converted this data into a REST API to keep the bandwidth consumption per user at a minimum.
            <br />
            <br />
            Since this data source is static and not continuosuly updated by government. There's little I can do to assure it's continuous reliability. Hence, I provide this data AS/IS without any implied warranty and legibility. 
            <br />
            <br />
            A feedback feature in the future might help with this.
        </Typography.Paragraph>


        <Typography.Title level={4}>How can I suggest additions or changes?</Typography.Title>
        <Typography.Paragraph>
            Great Question! You can suggest any location improvements or discuss possibility for collaboration using this <a href="https://docs.google.com/forms/d/e/1FAIpQLSe7V1ag_9ke80bw40MXkXZwUlU6BaILeubaSSHvpJK5p3rvvg/viewform">form</a>
        </Typography.Paragraph>

        <Typography.Title level={4}>What's next?</Typography.Title>
        <Typography.Paragraph>
          I would like to implement functionality, where people can come together
          as a community and suggest new vaccination centres. As I have come to know 
          that there are many pop-up vaccination centres as well.

          However, right now due to time constraints that might not be possible for me
          to implement. If you have time and know code, please contact me using the form link given below.
        </Typography.Paragraph>

        <Typography.Title level={4}>Is the project open source?</Typography.Title>
        <Typography.Paragraph>Open source has made it possible, I'll share the repo link soon!</Typography.Paragraph>
      </Col>
    </Row>
  );
}
