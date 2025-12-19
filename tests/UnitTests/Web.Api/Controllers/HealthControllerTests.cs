using Web.Api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using FluentAssertions;

namespace UnitTests.Web.Api.Controllers;

public class HealthControllerTests
{
    [Fact]
    public void Get_ShouldReturnOkResult()
    {
        // Arrange
        var controller = new HealthController();

        // Act
        var result = controller.Get();

        // Assert
        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public void Get_ShouldReturnHealthyStatus()
    {
        // Arrange
        var controller = new HealthController();

        // Act
        var result = controller.Get() as OkObjectResult;

        // Assert
        result.Should().NotBeNull();
        result?.Value.Should().NotBeNull();
    }
}
